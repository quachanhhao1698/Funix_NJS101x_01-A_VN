
exports.getLogin = (req, res, next) => {
  const loggedIn = req.get('Cookie').split('=')[1] == 'true'
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: loggedIn
    
  });
};

exports.postLogin = (req,res,next)=>{
  res.cookie('loggedIn','true');
  res.redirect("/")
}