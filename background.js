
const focused_window_history = [];
function update_last_focused_window(windowId) {
  if (windowId < 0) return;
  focused_window_history.unshift(windowId);
  if (focused_window_history.length >= 3) {
    focused_window_history.pop()
  }
  console.log("focused_window_history:", focused_window_history)
}
chrome.windows.onFocusChanged.addListener(update_last_focused_window)


async function start() {
  const current = await chrome.windows.getCurrent();
  const last_focused = focused_window_history[1];
  console.log("current:", current)
  console.log("last_focused:", last_focused)

  const allTabs = await chrome.tabs.query({
    highlighted: true,
    windowId: last_focused
  });
  console.log("allTabs:", allTabs)
  allTabs.forEach((tab) => {
    chrome.tabs.move(tab.id, {
      windowId: current.id,
      index: -1
    });
  });
}
chrome.action.onClicked.addListener(start);



command_name = "move"
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
  if (command == command_name) {
    start();
  }
});
