<?php

/**
 * @param $key
 * @return string|string[]
 */
function investmentStatus ($key=null): array|string
{
    return mapHelperDataSet([
        STATUS_ACTIVE,
        STATUS_PENDING,
    ], $key);
}
