<?php

/**
 * @param $key
 * @return string|string[]
 */
function withdrawStatus2 ($key=null): array|string
{
    return mapHelperDataSet([
        WITHDRAW_STATUS_PENDING,
        WITHDRAW_STATUS_ACCEPTED,
    ], $key);
}
