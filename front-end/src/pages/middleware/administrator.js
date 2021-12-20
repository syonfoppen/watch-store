import router from "page";
import userStorage from "../../stores/user"

export default function(ctx, next) {
    let user;

    userStorage.subscribe(userObj => {
        user = userObj;
    });

    if (user && user.isAdmin) {
        next();
    } else {
        console.log('[ERROR] You are not authorized to access this page!');
        router.redirect("/");
    }
}