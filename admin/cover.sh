#! /bin/bash

source .env

# start clean
rm -rf $COV_DIR

# run tests collecting coverage infomation
deno test --allow-read=./ --coverage=$COV_DIR ./sanguine

# output lcov report file
deno coverage $COV_DIR --lcov --output=$COV_DIR.lcov

# collect the coverage percentages for all tested units
deno coverage test_coverage/ | grep cover | cut -d " " -f 4 > $COV_DIR/.thresh

# check coverage is meeting or exceeding the set threshold
cat $COV_DIR/.thresh | xargs deno run ./admin/covThreshold.ts $THRESHOLD

# check the last exit status before continuing
test $? -eq 1 && exit $?

# convert the coverage report into html pages
genhtml -o $COV_DIR/html $COV_DIR.lcov

# remove files used to generate html pages
find test_coverage/ -type f -name "*.json" -delete

# remove nested directory
mv $COV_DIR/html/* $COV_DIR
rm -r $COV_DIR/html

# remove, now, unnecessary lcov report file
rm $COV_DIR.lcov