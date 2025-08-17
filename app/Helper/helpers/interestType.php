<?php

/**
 * @param $key
 * @return string|string[]
 */
function interestType ($key=null): array|string
{
    return mapHelperDataSet([
        INTEREST_TYPE_DAILY,
        INTEREST_TYPE_WEEKLY,
        INTEREST_TYPE_MONTHLY,
    ], $key);
}
