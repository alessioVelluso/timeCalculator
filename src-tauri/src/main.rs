// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::SystemTray;
mod tray;


fn main() {
  let tray = SystemTray::new().with_menu(tray::get_tray_menu());


  tauri::Builder::default()
    .system_tray(tray)
    .on_system_tray_event(tray::handle_system_tray_event)
    //.c(tray::handle_window_event)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
