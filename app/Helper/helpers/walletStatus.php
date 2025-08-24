<?php

/**
 * @param $key
 * @return string|string[]
 */
function walletStatus ($key=null): array|string
{
    return mapHelperDataSet([
        WALLET_STATUS_WITHDRAW,
        WALLET_STATUS_NOTWITHDRAWN,
    ], $key);
}
