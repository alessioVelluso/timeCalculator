use tauri::{AppHandle, CustomMenuItem, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use tauri::Manager;

pub fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => {
            handle_left_click(app);
        }
        SystemTrayEvent::MenuItemClick { id, .. } => {
            handle_menu_item_click(app, id);
        }
        _ => {}
    }
}

pub fn get_tray_menu() -> SystemTrayMenu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide);

    return tray_menu;
}

// pub fn handle_window_event(event: GlobalWindowEvent) {
//     if let GlobalWindowEvent::CloseRequested { label, api, .. } = event {
//         // Supponiamo che tu stia gestendo una finestra con l'ID "main"
//         if label == "main" {
//             api.prevent_close();  // Previeni la chiusura della finestra
//             if let Some(window) = api.window() {
//                 handle_left_click(&api.app()); // Nascondi la finestra
//             }
//         }
//     }
// }


fn handle_left_click(app: &AppHandle) {
    if let Some(window) = app.get_window("main") {
        if window.is_visible().unwrap_or(false) {
            window.hide().unwrap();
        } else {
            window.show().unwrap();
            window.unminimize().unwrap();
            window.set_focus().unwrap();
        }
    }
}

fn handle_menu_item_click(app: &AppHandle, id: String) {
    match id.as_str() {
        "hide" => {
            if let Some(window) = app.get_window("main") {
                window.hide().unwrap();
            }
        }
        "quit" => {
            std::process::exit(0);
        }
        _ => {}
    }
}
