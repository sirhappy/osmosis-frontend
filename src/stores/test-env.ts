import { ChainStore } from "./chain";
import {
  AccountSetBase,
  AccountStore,
  QueriesStore
} from "@keplr-wallet/stores";
import { MemoryKVStore } from "@keplr-wallet/common";
import { autorun } from "mobx";
import { AccountWithCosmosAndOsmosis } from "./osmosis/account";
import { QueriesWithCosmosAndOsmosis } from "./osmosis/query";
import { MockKeplr } from "@keplr-wallet/provider";
import { BroadcastMode, StdTx } from "@cosmjs/launchpad";
import Axios from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import WebSocket from "ws";
import { exec } from "child_process";
import { ChainInfo } from "@keplr-wallet/types";
import { Bech32Address } from "@keplr-wallet/cosmos";

export const TestChainInfos: ChainInfo[] = [
  {
    rpc: "http://127.0.0.1:26657",
    rest: "http://127.0.0.1:1317",
    chainId: "localnet-1",
    chainName: "OSMOSIS",
    stakeCurrency: {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6
    },
    bip44: {
      coinType: 118
    },
    bech32Config: Bech32Address.defaultBech32Config("cosmos"),
    currencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6
      },
      {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6
      },
      {
        coinDenom: "FOO",
        coinMinimalDenom: "ufoo",
        coinDecimals: 6
      },
      {
        coinDenom: "BAR",
        coinMinimalDenom: "ubar",
        coinDecimals: 6
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6
      }
    ],
    features: ["stargate"]
  }
];

export class RootStore {
  public readonly chainStore: ChainStore;
  public readonly accountStore: AccountStore<AccountWithCosmosAndOsmosis>;
  public readonly queriesStore: QueriesStore<QueriesWithCosmosAndOsmosis>;

  constructor() {
    const mockKeplr = new MockKeplr(
      async (chainId: string, tx: StdTx, mode: BroadcastMode) => {
        const chainInfo = TestChainInfos.find(info => info.chainId === chainId);
        if (!chainInfo) {
          throw new Error("Unknown chain info");
        }

        const restInstance = Axios.create({
          ...{
            baseURL: chainInfo.rest
          }
        });

        const params = {
          tx,
          mode
        };

        const result = await restInstance.post("/txs", params);
        if (result.data.code != null && result.data.code !== 0) {
          throw new Error(result.data["raw_log"]);
        }

        return Buffer.from(result.data.txhash, "hex");
      },
      TestChainInfos,
      "health nest provide snow total tissue intact loyal cargo must credit wrist"
    );

    this.chainStore = new ChainStore(TestChainInfos, "localnet-1");

    this.queriesStore = new QueriesStore(
      new MemoryKVStore("test_store_web_queries"),
      this.chainStore,
      async () => {
        return mockKeplr;
      },
      QueriesWithCosmosAndOsmosis
    );
    this.accountStore = new AccountStore(
      {
        // No need
        addEventListener: () => {}
      },
      AccountWithCosmosAndOsmosis,
      this.chainStore,
      this.queriesStore,
      {
        defaultOpts: {
          suggestChain: false,
          prefetching: true,
          autoInit: true,
          getKeplr: async () => {
            return mockKeplr;
          },
          wsObject: WebSocket as any
        }
      }
    );
  }
}

export function getEventFromTx(tx: any, type: string): any {
  return JSON.parse(tx.tx_result.log)[0].events.find(
    (e: any) => e.type === type
  );
}

function deepContainedObj(obj1: any, obj2: any): boolean {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  for (const key of Object.keys(obj1)) {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!deepContainedObj(value1, value2)) {
      return false;
    }
  }

  return true;
}

function deepContainedArray(array1: any, array2: any): boolean {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    const obj1 = array1[i];
    let passed = false;

    for (let j = 0; j < array2.length; j++) {
      const obj2 = array2[j];

      if (Array.isArray(obj1) || Array.isArray(obj2)) {
        if (deepContainedArray(obj1, obj2)) {
          passed = true;
          break;
        }
      } else if (deepContainedObj(obj1, obj2)) {
        passed = true;
        break;
      }
    }

    if (!passed) {
      return false;
    }
  }

  return true;
}

export function deepContained(obj1: any, obj2: any) {
  if (Array.isArray(obj1) || Array.isArray(obj2)) {
    if (!deepContainedArray(obj1, obj2)) {
      throw new Error(
        `obj1 is not included in obj2: (obj1 - ${JSON.stringify(
          obj1
        )}, obj2 - ${JSON.stringify(obj2)})`
      );
    }
  } else if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    if (obj1 !== obj2) {
      throw new Error(
        `obj1 is not included in obj2: (obj1 - ${JSON.stringify(
          obj1
        )}, obj2 - ${JSON.stringify(obj2)})`
      );
    }
  } else {
    for (const key of Object.keys(obj1)) {
      const value1 = obj1[key];
      const value2 = obj2[key];
      deepContained(value1, value2);
    }
  }
}

export function initLocalnet(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    exec(
      `sh ${__dirname}/../../scripts/run-localnet.sh`,
      (error, _stdout, _stderr) => {
        if (error) {
          reject(new Error(`error: ${error.message}`));
          return;
        }

        // Wait some time to init node and process genesis block.
        setTimeout(resolve, 1000);
      }
    );
  });
}

export async function waitAccountLoaded(
  account: AccountSetBase<unknown, unknown>
) {
  if (account.isReadyToSendMsgs) {
    return;
  }

  return new Promise<void>(resolve => {
    const disposer = autorun(() => {
      if (account.isReadyToSendMsgs) {
        resolve();
        disposer();
      }
    });
  });
}

export function createTestStore() {
  return new RootStore();
}
