function update_time(x) {
    return (~~(x / 3)) * 24 + 12 + ((x % 3) * 6);
}

function write(value) {
    if (value < 0)
        $("p").text("比沒蹲還少 " + (-value) + " 分");
    else if (value === 0)
        $("p").text("沒蹲到分");
    else
        $("p").text("你蹲了 " + value + " 分");
}

function get_time() {
    let date = new Date();
    return (date.getDay() - 1) * 24 + date.getHours() + 1;
}

function stoi(value) {
    if (/^(\-|\+)?([0-9]+)$/.test(value))
        return Number(value);
    return NaN;
}

function calculate_round(time) {
    let left = 1, right = 45, mid;
    do {
        mid = ~~((left + right) / 2); // Use ~~ to achieve floor
        if (update_time(mid - 1) < time)
            left = mid + 1;
        else
            right = mid;
    } while (left != right);
    return 5 * right;
}

function submit() {
    let score = stoi($("#score").val(), 10);
    if (isNaN(score) || score < 0) {
        alert("錯誤的目前分數");
        return;
    }

    let time = get_time();
    let round = calculate_round(time);
    if (typeof $("#week2:checked").val() === "string")
        round += 105;

    let round_left = stoi($("#left").val(), 10);
    if (isNaN(round_left) || round_left > 10 || round_left < 0 || (round -= round_left) < 0) {
        alert("剩餘場次錯誤");
        return;
    }

    if (round >= 66)
        write(score - 1056 - (round - 66) * 10);
    else if (round >= 49)
        write(score - 852 - (round - 49) * 12);
    else if (round >= 19)
        write(score - 402 - (round - 19) * 15);
    else if (round >= 13)
        write(score - 300 - (round - 13) * 17);
    else if (round >= 8)
        write(score - 200 - (round - 8) * 20);
    else if (round >= 4)
        write(score - 112 - (round - 4) * 22);
    else
        write(score - round * 28);
}
