import { DEFAULT, ETHERS, NONE, SOL, STARKEX, STARKNET, TEZOS, YES } from "../choices";
import {
  FILENAME_APP_TS,
  FILENAME_ETHERSRPC,
  FILENAME_PACKAGE_JSON,
  FILENAME_SOLANARPC,
  FILENAME_STARKEXRPC,
  FILENAME_STARKNETRPC,
  FILENAME_TEZOSRPC,
  FILENAME_TSCONFIG,
  FILENAME_WEB3RPC,
} from "./filenames";
import STEPS from "./stepContent";

export default function getSteps(steps, files, chain, evmFramework, customAuth, mfa, whitelabel, useModal, replacementAggregator) {
  steps.push(
    {
      ...STEPS.buildingApp,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "buildingApp"),
    },
    {
      ...STEPS.webpackIssues,
      pointer: replacementAggregator.highlightRange(FILENAME_TSCONFIG, files[FILENAME_TSCONFIG], "webpackIssues"),
    }
  );

  switch (chain) {
    case SOL:
      steps.push({
        ...STEPS.installationSolana,
        pointer: replacementAggregator.highlightRange(FILENAME_SOLANARPC, files[FILENAME_SOLANARPC], "installationSolana"),
      });
      break;
    case STARKEX:
      steps.push({
        ...STEPS.installationStarkEx,
        pointer: replacementAggregator.highlightRange(FILENAME_STARKEXRPC, files[FILENAME_STARKEXRPC], "installationStarkEx"),
      });
      break;
    case STARKNET:
      steps.push({
        ...STEPS.installationStarkNet,
        pointer: replacementAggregator.highlightRange(FILENAME_STARKNETRPC, files[FILENAME_STARKNETRPC], "installationStarkNet"),
      });
      break;
    case TEZOS:
      steps.push({
        ...STEPS.installationTezos,
        pointer: replacementAggregator.highlightRange(FILENAME_TEZOSRPC, files[FILENAME_TEZOSRPC], "installationTezos"),
      });
      break;
    default:
      if (evmFramework === ETHERS) {
        steps.push({
          ...STEPS.installationEthers,
          pointer: replacementAggregator.highlightRange(FILENAME_ETHERSRPC, files[FILENAME_ETHERSRPC], "installationEthers"),
        });
      } else {
        steps.push({
          ...STEPS.installationWeb3,
          pointer: replacementAggregator.highlightRange(FILENAME_WEB3RPC, files[FILENAME_WEB3RPC], "installationWeb3"),
        });
      }
  }

  if (useModal === YES) {
    if (customAuth !== NONE || whitelabel === YES || mfa !== DEFAULT) {
      steps.push(
        {
          ...STEPS.installationCustom,
          pointer: replacementAggregator.highlightRange(FILENAME_PACKAGE_JSON, files[FILENAME_PACKAGE_JSON], "installation"),
        },
        {
          ...STEPS.importModulesCustom,
          pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "importModules"),
        }
      );
    } else {
      steps.push(
        {
          ...STEPS.installation,
          pointer: replacementAggregator.highlightRange(FILENAME_PACKAGE_JSON, files[FILENAME_PACKAGE_JSON], "installation"),
        },
        {
          ...STEPS.importModules,
          pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "importModules"),
        }
      );
    }
  } else if (customAuth !== NONE || whitelabel === YES) {
    steps.push(
      {
        ...STEPS.installationCustomCore,
        pointer: replacementAggregator.highlightRange(FILENAME_PACKAGE_JSON, files[FILENAME_PACKAGE_JSON], "installation"),
      },
      {
        ...STEPS.importModulesCustomCore,
        pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "importModules"),
      }
    );
  } else {
    steps.push(
      {
        ...STEPS.installationCore,
        pointer: replacementAggregator.highlightRange(FILENAME_PACKAGE_JSON, files[FILENAME_PACKAGE_JSON], "installation"),
      },
      {
        ...STEPS.importModulesCore,
        pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "importModules"),
      }
    );
  }

  steps.push(
    {
      ...STEPS.registerApp,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "registerApp"),
    },
    {
      ...STEPS.instantiateSDK,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "instantiateSDK"),
    }
  );

  if (whitelabel === YES) {
    steps.push({
      ...STEPS.whiteLabeling,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "whiteLabeling"),
    });
  }

  if (customAuth !== NONE) {
    if (useModal === YES) {
      steps.push({
        ...STEPS.customAuth,
        pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "customAuthStep"),
      });
    } else {
      steps.push({
        ...STEPS.customAuthCore,
        pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "customAuthStep"),
      });
    }
  }

  if (
    useModal !== YES ||
    (mfa !== DEFAULT && useModal === YES) ||
    (customAuth !== NONE && useModal === YES) ||
    (whitelabel === YES && useModal === YES)
  ) {
    steps.push({
      ...STEPS.mfa,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "mfa"),
    });
  }

  if (useModal === YES) {
    steps.push({
      ...STEPS.initialize,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "initialize"),
    });
  } else {
    steps.push({
      ...STEPS.initializeCore,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "initialize"),
    });
  }

  steps.push(
    {
      ...STEPS.login,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "login"),
    },
    {
      ...STEPS.getUserInfo,
      pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "getUserInfo"),
    }
  );

  switch (chain) {
    case SOL:
      steps.push({
        ...STEPS.solanaRPCFunctions,
        pointer: replacementAggregator.highlightRange(FILENAME_SOLANARPC, files[FILENAME_SOLANARPC], "solanaRPCFunctions"),
      });
      break;
    case STARKEX:
      steps.push({
        ...STEPS.starkExRPCFunctions,
        pointer: replacementAggregator.highlightRange(FILENAME_STARKEXRPC, files[FILENAME_STARKEXRPC], "starkExRPCFunctions"),
      });
      break;
    case STARKNET:
      steps.push({
        ...STEPS.starkNetRPCFunctions,
        pointer: replacementAggregator.highlightRange(FILENAME_STARKNETRPC, files[FILENAME_STARKNETRPC], "starkNetRPCFunctions"),
      });
      break;
    case TEZOS:
      steps.push({
        ...STEPS.tezosRPCFunctions,
        pointer: replacementAggregator.highlightRange(FILENAME_TEZOSRPC, files[FILENAME_TEZOSRPC], "tezosRPCFunctions"),
      });
      break;
    default:
      steps.push({
        ...STEPS.evmRPCFunctions,
        pointer: replacementAggregator.highlightRange(
          evmFramework === ETHERS ? FILENAME_ETHERSRPC : FILENAME_WEB3RPC,
          files[evmFramework === ETHERS ? FILENAME_ETHERSRPC : FILENAME_WEB3RPC],
          "evmRPCFunctions"
        ),
      });
      break;
  }

  steps.push({
    ...STEPS.logout,
    pointer: replacementAggregator.highlightRange(FILENAME_APP_TS, files[FILENAME_APP_TS], "logout"),
  });
}
