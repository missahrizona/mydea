pwd
echo "Building..."
ng build
echo "Copying..."
cp -r dist/internalapp-primeng/* ../../builds/internalapp-primeng/
cd ../../builds/internalapp-primeng/
echo "Version Control..."
git add .
git commit -m 'deploy'
echo "Deploying..."
git push