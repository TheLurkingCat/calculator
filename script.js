$(document).ready(function () {
    function update_time(x) {
        return (Math.floor(x / 3)) * 24 + 12 + ((x % 3) * 6);
    }

    function write(value) {
        if (value < 0)
            $("p").text("比沒蹲還少 " + (-value) + " 分");
        else if (value === 0)
            $("p").text("沒蹲到分");
        else
            $("p").text("你蹲了 " + value + " 分");
    }

    function get_week() {
        let start = Date.UTC(2020, 0, 6, -8, 0, 0, 0);
        let duration = Date.now() - start;
        if (duration < 0)
            return false;
        // 86400000 milliseconds per day, 14 day a cycle.
        return (duration / 86400000) % 14 > 7;

    }
    function get_time() {
        let date = new Date();
        // Use UTC+8 timezone, add additional 1 for ceiling minutes and seconds.
        return (date.getUTCDay() - 1) * 24 + date.getUTCHours() + 9;
    }

    function stoi(value) {
        // No floating point and alphabet.
        if (/\D/.test(value))
            return NaN;
        return parseInt(value, 10);
    }

    function calculate_round() {
        let time = get_time();
        let left = 1, right = 45, mid;
        // Binary search to get current round.
        do {
            mid = Math.floor((left + right) / 2);
            if (update_time(mid - 1) < time)
                left = mid + 1;
            else
                right = mid;
        } while (left != right);
        return 5 * right;
    }

    function submit() {
        let score = stoi($("#score").val());
        if (isNaN(score)) {
            alert("錯誤的目前分數");
            return;
        }

        let round = calculate_round();
        if (get_week())
            round += 105;

        let round_left = stoi($("#left").val(), 10);
        if (isNaN(round_left) || round_left > Math.min(10, round)) {
            alert("剩餘場次錯誤");
            return;
        }
        round -= round_left;

        // calculate score without additional score
        if (round >= 69)
            write(score - 1050 - (round - 69) * 10);
        else if (round >= 50)
            write(score - 862 - (round - 50) * 12);
        else if (round >= 20)
            write(score - 412 - (round - 20) * 15);
        else if (round >= 14)
            write(score - 310 - (round - 14) * 17);
        else if (round >= 9)
            write(score - 210 - (round - 9) * 20);
        else if (round >= 4)
            write(score - 100 - (round - 4) * 22);
        else
            write(score - round * 25);
    }

    $('#form').submit(function (e) {
        // Prevent page refresh
        e.preventDefault();
        submit();
    });
});
