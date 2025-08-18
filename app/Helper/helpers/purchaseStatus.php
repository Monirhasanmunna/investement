<?php

/**
 * @param $key
 * @return string|string[]
 */
function purchaseStatus ($key=null): array|string
{
    return mapHelperDataSet([
        PURCHASE_STATUS_ACCEPTED,
        PURCHASE_STATUS_PENDING,
    ], $key);
}
