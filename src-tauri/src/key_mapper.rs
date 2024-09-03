use std::sync::{atomic::{AtomicBool, Ordering}, Arc, Mutex};

use rdev::{ grab, Event, EventType, Key };
use enigo::{ Enigo, Keyboard, Settings };

static ALT_PRESSED: AtomicBool = AtomicBool::new(false);
static BACKSLASH_PRESSED: AtomicBool = AtomicBool::new(false);
static MINUS_PRESSED: AtomicBool = AtomicBool::new(false);

pub fn key_mapper_thread() {
    let enigo = Arc::new(Mutex::new(Enigo::new(&Settings::default()).unwrap()));

    if let Err(error) = grab(move |event:Event| { callback(event, &enigo) }) {
        println!("Error: {:?}", error)
    }
}

fn callback(event: Event, enigo: &Arc<Mutex<Enigo>>) -> Option<Event> {
    let mut enigo = enigo.lock().unwrap();

    match event.event_type {
        EventType::KeyPress(key) => manage_pressed_keys(key, event, &mut enigo),
        EventType::KeyRelease(key) => manage_released_keys(key, event),
        _ => { return Some(event); }
    }
}

fn manage_pressed_keys(key:Key, event:Event, enigo: &mut Enigo) -> Option<Event> {
    println!("Key pressed: {:?}", key);
    if key == Key::Alt { ALT_PRESSED.store(true, Ordering::SeqCst) }
    if key == Key::BackSlash && ALT_PRESSED.load(Ordering::SeqCst) {
        println!("Literal");
        _ = enigo.text("`");
        None
    }
    else if key == Key::Minus && ALT_PRESSED.load(Ordering::SeqCst) {
        println!("Tilde");
        None
    }
    else {
        Some(event)
    }
}
fn manage_released_keys(key:Key, event:Event) -> Option<Event> {
    // println!("Key released: {:?}", key);
    if key == Key::Alt { ALT_PRESSED.store(false, Ordering::SeqCst) }
    if key == Key::BackSlash { BACKSLASH_PRESSED.store(false, Ordering::SeqCst) }
    if key == Key::Minus { MINUS_PRESSED.store(false, Ordering::SeqCst) }
    Some(event)
}
