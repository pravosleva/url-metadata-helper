#!/bin/bash

# quaint_copy копирует файлы определённого расширения $3 из каталога $1 в
# каталог $2

quaint_copy(){
  srcDir=$1
  destDir=$2
  ext=$3
  
  rsync -r -f '+ *.'"$ext" -f '+ **/' -f '- *' --prune-empty-dirs $srcDir $destDir
}

quaint_copy $1 $2 $3
