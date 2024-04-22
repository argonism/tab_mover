
async function start() {
  const current = await chrome.windows.getCurrent();
  console.log("current:", current,)

  const allTabs = await chrome.tabs.query({
    highlighted: true
  });
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
