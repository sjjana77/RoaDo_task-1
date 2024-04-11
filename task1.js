function get_active_logged_in(test_data, target_month) {
    var firstDay = new Date(target_month.getFullYear(), target_month.getMonth(), 1); //this is a first day of given month
    var lastDay = new Date(target_month.getFullYear(), target_month.getMonth() + 1, 0); //this is a lasr day of given month
    var log_in_users = new Set();
    var active_users = new Set();
    for (var _i = 0, test_data_1 = test_data; _i < test_data_1.length; _i++) {
        var data = test_data_1[_i];
        //logged in users calc
        if (data.logged_in >= firstDay && data.logged_in < lastDay) {
            log_in_users.add(data.user_id); //logged in users
            //active users calc
            if (data.last_seen && data.last_seen >= data.logged_in && data.last_seen >= firstDay && data.last_seen < lastDay) {
                var last_seen = data.last_seen.getTime();
                var logged_in = data.logged_in.getTime();
                var active_duration = last_seen - logged_in;
                //assume active user last seen after 1 min of log in  
                if (active_duration >= 60000) {
                    active_users.add(data.user_id);
                }
            }
        }
    }
    return { log_in_users: log_in_users.size, active_users: active_users.size };
}
//test_data
var test_data = [
    {
        "user_id": "user1",
        "logged_in": new Date(2024, 3, 10, 10, 0, 0), //april 10, 2024, 10:00 AM
        "logged_out": new Date(2024, 3, 10, 12, 0, 0), //april 10, 2024, 12:00 PM
        "last_seen": new Date(2024, 3, 10, 11, 30, 0) //april 10, 2024, 11:30 AM
    },
    {
        "user_id": "user2",
        "logged_in": new Date(2024, 3, 12, 15, 0, 0), //april 12, 2024,3:00 PM
        "last_seen": new Date(2024, 3, 12, 16, 0, 0) //april 12, 2024,4:00 PM
    },
    {
        "user_id": "user1",
        "logged_in": new Date(2024, 3, 15, 9, 0, 0), //april 15, 2024,9:00 AM
    },
    {
        "user_id": "user3",
        "logged_in": new Date(2024, 3, 8, 8, 0, 0), //april 8, 2024,8:00 AM
        "logged_out": new Date(2024, 3, 8, 10, 0, 0) //april 8, 2024,10:00 AM
    },
    {
        "user_id": "user2",
        "logged_in": new Date(2024, 2, 29, 18, 0, 0), //march 29, 2024,6:00 PM
        "last_seen": new Date(2024, 3, 2, 10, 0, 0) //march 2, 2024,10:00 AM
    }
];
var target_month = new Date(2024, 3); //april 2024
var res = get_active_logged_in(test_data, target_month);
console.log("Logged-in Users in ".concat(target_month, ": ").concat(res.log_in_users));
console.log("Active Users in ".concat(target_month, ": ").concat(res.active_users));
