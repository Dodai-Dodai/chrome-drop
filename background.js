chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.url) {
        console.error('アクティブなタブにURLがありません。');
        return;
    }
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: initiateShare,

            args: [tab.title, tab.url]
        });
    } catch (error) {
        console.error('共有の実行に失敗しました:', error);
    }
});

function initiateShare(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).then(() => {
            console.log('共有が成功しました');
        }).catch((error) => {
            console.error('共有がキャンセルされました', error);
        });
    } else {
        copyToClipboard(url);
        alert('このブラウザは共有機能をサポートしていません。URLがクリップボードにコピーされました。');
    }
}

