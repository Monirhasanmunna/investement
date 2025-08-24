<?php

/**
 * @param $key
 * @return string|string[]
 */
function withdrawStatus ($key=null): array|string
{
    return mapHelperDataSet([
        WALLET_STATUS_WITHDRAW,
        WALLET_STATUS_NOTWITHDRAWN,
    ], $key);
}
