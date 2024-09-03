// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use std::thread;

use tauri::SystemTray;
mod tray;
// mod key_mapper;


fn main() {
  let tray = SystemTray::new().with_menu(tray::get_tray_menu());

  // thread::spawn(key_mapper::key_mapper_thread);

  tauri::Builder::default()
    .system_tray(tray)
    .on_system_tray_event(tray::handle_system_tray_event)
    //.c(tray::handle_window_event)
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
