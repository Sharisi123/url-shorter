# Variables
now=$(date +"%T")
devider="========================="

# System information log
echo $devider
echo "Current directory: $PWD"
echo "Current time: $now"
echo $devider

cd ../..
mkdir -p build
cd ./build

echo "[$now] Building..."

rm car-creating.txt
touch car-creating.txt

echo "[$now] Car creating conveyor" >> car-creating.txt
echo "[$now] Car creating conveyor..."
sleep 1

echo "[$now] Adding engine" >> car-creating.txt
echo "[$now] Adding engine..."
sleep 1

echo "[$now] Adding cab" >> car-creating.txt
echo "[$now] Adding cab..."
sleep 1

echo "[$now] Adding wheels" >> car-creating.txt
echo "[$now] Adding wheels..."
sleep 1

echo "[$now] Car creation completed successfully ✔️" >> car-creating.txt
echo "[$now] Car creation completed successfully ✔️"
echo $devider

if  grep -q "this is a line" ./car-creating.txt ; then
         echo 'the string exists' ; 
else
         echo 'the string does not exist' ; 
fi