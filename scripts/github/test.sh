# Variables
now=$(date +"%T")
devider="========================="

# Functions
# Line check
check_car_module () {
  if  grep -q "$1" ./car-creating.txt ; 
    then echo "[$now] $3 exists ✔️"; 
    else 
      echo "[$now] $2 not exist ❌"
      echo "[$now] Aborting..."
      exit 0; 
  fi
}

# Repeating functionalyti replace
check_car_module_block () {
  echo "[$now] $1"
  sleep 0.5
  check_car_module $2 $3
  echo $devider
}

# System information log
echo $devider
echo "Current directory: $PWD"
echo "Current time: $now"
echo $devider

cd ../../build

check_car_module_block "Cheaking for engine..." "Adding engine" "Engine"

check_car_module_block "Cheaking for cab..." "Adding cab" "Cab"

check_car_module_block "Cheaking for wheels..." "Adding wheels" "Wheels"

echo "[$now] Everytring fine ✔️"