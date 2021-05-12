# FinalResumeBuilderBackend
step 1:Download Visual Studio Code
step 2.Download Extension github pull and raise issue
step 3.Change email xyz@gmail.com to yours
  src\routers\contact-us-router.ts line no. 27
  src\controller\user-controller.ts line no. 289 349
step 4.Add api key from sendgrid
  src\nodemailer.ts line no.17
step 5.Change database url of mongodb
  src\environments\environment.prod.ts line no. 6
  src\environments\environment.dev.ts line no. 6
step 6.Npm Install on terminal

#production deployment

step 7.Delete yarn.lock file
step 8.Add script in package.json "create-bundle":"tsc && node build/index.js" and run command => npm run create-bundle
step 9.Replace script "start":"node build/index.js"
step 10:Delete .git if any before uploading
step 11.Change path of image storage in build\routers\resume-router.js line no. 10 
   replace cb(null, './src/uploads')
   with
   cb(null, './build/uploads')
    Also check if uploadimage folder not included then copy paste it in build folder.
step 12.Replace in backend in build\controller\resume-controller.js in line no. 448
   const path = image_name ? 'http://localhost:5000/' + 'build/uploads/' + image_name : null;
   with
   const path = image_name ? 'https://xyz.herokuapp.com/' + 'build/uploads/' + image_name : null;
   or can use default method as given below
       const image_url = (req.file).path;
       const path = image_url ? 'https://xyz.herokuapp.com/' + image_url : null;
step 13.Follow heroku site and restart all dynos from actions
step 14.Whatever url pops up on terminal use it as baseUrl in frontend in \src\app\services\http-service.ts in line no. 13
  replace private baseURl = 'http://localhost:5000/api';
  with
  private baseURl='https://xyz.herokuapp.com/api';
  
Here we considered frontend in local server 4200
