export function formatDate(date) {
    const formattedDate = new Date(date);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return formattedDate.toLocaleDateString('en-GB', options);
}

export function generateBackButton() {
    return `
    <button class="btn_home" style="margin-right: 20px; margin-top: 3px;" id="btn_back">
    <image src="/settings/3643764_back_backward_left_reply_turn_icon.svg" class="btn_icon"></image>
    </button>
    `;
}