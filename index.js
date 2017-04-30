import fs from 'fs';

const INPUT = './input_file_large.txt';
const OUTPUT = './output.txt';
const TEMP_FILE_1 = './temp1.txt';
const TEMP_FILE_2 = './temp2.txt';
const TEMP_FILE_3 = './temp3.txt';
const TEMP_FILE_4 = './temp4.txt';
const TEMP_FILE_5 = './temp5.txt';
const TEMP_FILE_6 = './temp6.txt';
const TEMP_FILE_7 = './temp7.txt';
const TEMP_FILE_8 = './temp8.txt';
const MAX = 4375000000;

// init: delete template and output files
function init() {
  if (fs.existsSync(TEMP_FILE_1)) {
    fs.unlinkSync(TEMP_FILE_1);
  }
  if (fs.existsSync(TEMP_FILE_2)) {
    fs.unlinkSync(TEMP_FILE_2);
  }
  if (fs.existsSync(TEMP_FILE_3)) {
    fs.unlinkSync(TEMP_FILE_3);
  }
  if (fs.existsSync(TEMP_FILE_4)) {
    fs.unlinkSync(TEMP_FILE_4);
  }
  if (fs.existsSync(TEMP_FILE_5)) {
    fs.unlinkSync(TEMP_FILE_5);
  }
  if (fs.existsSync(TEMP_FILE_6)) {
    fs.unlinkSync(TEMP_FILE_6);
  }
  if (fs.existsSync(TEMP_FILE_7)) {
    fs.unlinkSync(TEMP_FILE_7);
  }
  if (fs.existsSync(TEMP_FILE_8)) {
    fs.unlinkSync(TEMP_FILE_8);
  }
  if (fs.existsSync(OUTPUT)) {
    fs.unlinkSync(OUTPUT);
  }
}

function wtireToTempFile(lines) {
  console.time('write template file');
  const temp1 = [];
  const temp2 = [];
  const temp3 = [];
  const temp4 = [];
  const temp5 = [];
  const temp6 = [];
  const temp7 = [];
  const temp8 = [];
  for (const line of lines) {
    const [num] = line.split(',');
    const number = Number(num);
    if (number < MAX / 8) {
      temp1.push(line);
    } else if (number > MAX / 8 && number < MAX / 8 * 2) {
      temp2.push(line);
    } else if (number > MAX / 8 * 2 && number < MAX / 8 * 3) {
      temp3.push(line);
    } else if (number > MAX / 8 * 3 && number < MAX / 8 * 4) {
      temp4.push(line);
    } else if (number > MAX / 8 * 4 && number < MAX / 8 * 5) {
      temp5.push(line);
    } else if (number > MAX / 8 * 5 && number < MAX / 8 * 6) {
      temp6.push(line);
    } else if (number > MAX / 8 * 6 && number < MAX / 8 * 7) {
      temp7.push(line);
    } else if (number > MAX / 8 * 7 && number < MAX) {
      temp8.push(line);
    }
  }
  fs.appendFileSync(TEMP_FILE_1, temp1.join('\n'));
  fs.appendFileSync(TEMP_FILE_2, temp2.join('\n'));
  fs.appendFileSync(TEMP_FILE_3, temp3.join('\n'));
  fs.appendFileSync(TEMP_FILE_4, temp4.join('\n'));
  fs.appendFileSync(TEMP_FILE_5, temp5.join('\n'));
  fs.appendFileSync(TEMP_FILE_6, temp6.join('\n'));
  fs.appendFileSync(TEMP_FILE_7, temp7.join('\n'));
  fs.appendFileSync(TEMP_FILE_8, temp8.join('\n'));
  console.timeEnd('write template file');
}

function writeResultFromTemp(tempFile) {
  console.time('append result file');
  const data = fs.readFileSync(tempFile, 'utf8');
  const array = data.split('\n');
  array.sort(function(a, b) {
    const numa = Number(a.split(',')[0]);
    const numb = Number(b.split(',')[0]);
    return numa - numb;
  });
  fs.appendFileSync(OUTPUT, array.join('\n'));
  console.timeEnd('append result file');
}

function writeResult() {
  writeResultFromTemp(TEMP_FILE_1);
  writeResultFromTemp(TEMP_FILE_2);
  writeResultFromTemp(TEMP_FILE_3);
  writeResultFromTemp(TEMP_FILE_4);
  writeResultFromTemp(TEMP_FILE_5);
  writeResultFromTemp(TEMP_FILE_6);
  writeResultFromTemp(TEMP_FILE_7);
  writeResultFromTemp(TEMP_FILE_8);
}

function sortLargeData() {
  let lines = [];
  let count = 0;
  const inputLineReader = require('readline').createInterface({
    input: fs.createReadStream(INPUT),
  });
  inputLineReader
    .on('line', function(line) {
      lines.push(line);
      count++;
      if (count === 10000) {
        wtireToTempFile(lines);
        count = 0;
        lines = [];
      }
    })
    .on('close', function() {
      writeResult();
    });
}

function binarySearch(ar, el, compare) {
  let m = 0;
  let n = ar.length - 1;
  while (m <= n) {
    const k = n + m >> 1;
    const cmp = compare(el, ar[k]);
    if (cmp > 0) {
      m = k + 1;
    } else if (cmp < 0) {
      n = k - 1;
    } else {
      return k;
    }
  }
  return -m - 1;
}

function searchResult(tempFile, num) {
  const data = fs.readFileSync(tempFile, 'utf8');
  const array = data.split('\n');
  const index = binarySearch(array, num, function(a, b) {
    return a - Number(b.split(',')[0]);
  });
  console.log(`result:${array[index]}`);
}

function search(number) {
  if (number < MAX / 8) {
    searchResult(TEMP_FILE_1);
  } else if (number > MAX / 8 && number < MAX / 8 * 2) {
    searchResult(TEMP_FILE_2);
  } else if (number > MAX / 8 * 2 && number < MAX / 8 * 3) {
    searchResult(TEMP_FILE_3);
  } else if (number > MAX / 8 * 3 && number < MAX / 8 * 4) {
    searchResult(TEMP_FILE_4);
  } else if (number > MAX / 8 * 4 && number < MAX / 8 * 5) {
    searchResult(TEMP_FILE_5);
  } else if (number > MAX / 8 * 5 && number < MAX / 8 * 6) {
    searchResult(TEMP_FILE_6);
  } else if (number > MAX / 8 * 6 && number < MAX / 8 * 7) {
    searchResult(TEMP_FILE_7);
  } else if (number > MAX / 8 * 7 && number < MAX) {
    searchResult(TEMP_FILE_8);
  }
}

// -------------main--------------
// init();
// sortLargeData();
// 有了template文件后可以单独运行search方法
search(Math.floor(Math.random() * MAX));
