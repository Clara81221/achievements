async function loadData() {
    const response = await fetch("db.json");
    const data = await response.json();

    const achievements = data.achievements;

    const unlocked = achievements.filter(a => a.unlocked);
    const locked = achievements.filter(a => !a.unlocked);

    const unlockedCount = unlocked.length;
    const totalCount = achievements.length;
    const percent = totalCount
        ? Math.round((unlockedCount / totalCount) * 100)
        : 0;

    // Stats
    replacePlaceholder("%HOURS%", data.hours);
    replacePlaceholder("%ACHIEVEMENTS_UNLOCKED%", unlockedCount);
    replacePlaceholder("%ACHIEVEMENTS_TOTAL%", totalCount);
    replacePlaceholder("%ACHIEVEMENTS_PERCENT%", percent);

    // Progress bar
    document.getElementById("achievementProgress").style.width =
        `${percent}%`;

    // Achievement list
    const container = document.getElementById("personalAchieve");

    unlocked.forEach(a => renderAchievement(container, a));

    if (unlocked.length && locked.length) {
        container.insertAdjacentHTML(
            "beforeend",
            "<br><br><br>"
        );
    }

    locked.forEach(a => renderAchievement(container, a));
}

function renderAchievement(container, achievement) {
    const row = document.createElement("div");
    row.className = "achieveRow";

    const image = achievement.unlocked
        ? "/assets/unlocked_achievement_default.png"
        : "/assets/locked_achievement_default.png";

    row.innerHTML = `
        <div class="achieveImgHolder">
            <img src="${image}">
        </div>

        <div class="achieveTxtHolder">
            <div class="achieveTxt">
                <h3 class="ellipsis">${achievement.title}</h3>
                <h5>${achievement.desc}</h5>
            </div>
        </div>
    `;

    container.appendChild(row);
}

function replacePlaceholder(placeholder, value) {
    document.body.innerHTML =
        document.body.innerHTML.replaceAll(
            placeholder,
            String(value)
        );
}

loadData();