cd blog

if [ -f "index.html" ]; then
    npx http-server .
else
    echo "Generated index.html does not exists, run build command first."
fi 
