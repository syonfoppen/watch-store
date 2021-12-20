import router from "page";
import userStorage from "../../stores/user"

export default function(ctx, next) {
    let user;

    userStorage.subscribe(userObj => {
        user = userObj;
    });

    if (user && user.token) {
        next();
    } else {
        router.redirect("/login");
    }
}