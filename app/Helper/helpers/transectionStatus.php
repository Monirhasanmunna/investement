<?php

/**
 * @param $key
 * @return string|string[]
 */
function transectionStatus ($key=null): array|string
{
    return mapHelperDataSet([
        TRANSECTION_TYPE_INVESTMENT,
        TRANSECTION_TYPE_NOT_INTEREST,
    ], $key);
}
