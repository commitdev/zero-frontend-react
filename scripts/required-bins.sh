#!/bin/bash

REQUIRED_BINS=$@
FOUND_BINS=
MISSING_BINS=
EXIT_CODE=0

for ((i = 1; i <= $#; i++ )); do
  if command -v ${!i} > /dev/null; then
    FOUND_BINS="${FOUND_BINS}${!i} "
  else
    EXIT_CODE=1
    MISSING_BINS="${MISSING_BINS}${!i} "
  fi
done

if [[ "$EXIT_CODE" == "0" ]]; then
  echo "Successfully found binary(s): $FOUND_BINS";exit $EXIT_CODE
else
  echo "Missing binary(s): $MISSING_BINS" >&2 ; exit $EXIT_CODE
fi
