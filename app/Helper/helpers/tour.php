<?php

/**
 * @param $key
 * @return string|string[]
 */
function bookingTypes ($key=null): array|string
{
    return mapHelperDataSet([
        BOOKING_TYPE_DIRECT,
        BOOKING_TYPE_CONSULTANT
    ], $key);
}

function discountTypes ($key=null): array|string
{
    return mapHelperDataSet([
        PERCENTAGE,
        CASH
    ], $key);
}
