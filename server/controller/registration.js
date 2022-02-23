require('../db/dbconnection')
const Userschema = require('../model/userschema');


exports.registration = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        if(!username || !email || !password){

            errorsfun("registration", {error: "enter coorect password"})
        }else{

            const userexist = await Userschema.findOne({ email: email })
    
            if (userexist) {
                res.status(200).jsonp('you are already exits')
            } else {
    
                let noofusers = await Userschema.countDocuments();
                let no = 1;
                let id = noofusers + no;
                console.log("this is new users id: " + id);
    
                const user = new Userschema({ id, username, email, password });
    
                await user.save()
    
                res.redirect('login')
            }
        }

        function errorsfun(page, msg){
            res.render(page, {msg})
            console.log(msg)
        }


    } catch (err) {
        console.log("this is auth error" + err)

    }

}

