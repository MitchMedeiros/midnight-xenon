// Line comment
/* Block comment */
/// Doc comment
//! Inner doc comment

#![allow(dead_code)]

use std::collections::{HashMap, HashSet};
use std::fmt::{self, Display};
use std::io::prelude::*;
use crate::utils::helper as aux;

mod utils;
extern crate core;

const PI: f64 = 3.14159;
static GREETING: &str = "hello";
static mut COUNTER: u32 = 0;

type Id = u64;

fn main() {
    let hex = 0xff_u8;
    let binary = 0b1010;
    let octal = 0o755;
    let float = 1.5e-3_f32;
    let big = 1_000_000i64;
    let flag: bool = true;
    let letter = 'x';
    let escaped = "tab\t newline\n unicode \u{00e9} hex \x41";
    let raw = r#"raw "string""#;
    let bytes = b"bytes";
    let mut counter: i32 = 0;
    let names: Vec<&str> = vec!["a", "b"];
    let tuple: (i32, f64, char) = (1, 2.0, 'c');
    let array: [u8; 4] = [1, 2, 3, 4];
    let closure = |x: i32| -> i32 { x * 2 };

    println!("{} {:?} {name}", counter, names, name = "xenon");
    let text = format!("{PI:.2}");

    let circle = Circle::new(3.0);
    println!("{}", circle.area());

    for (index, value) in names.iter().enumerate() {
        if index == 0 && !value.is_empty() {
            continue;
        } else if index > 5 {
            break;
        }
    }

    while counter < 3 {
        counter += 1;
    }

    loop {
        break;
    }

    'outer: for i in 0..10 {
        for j in (0..=i).rev() {
            if j == 5 {
                break 'outer;
            }
        }
    }

    match tuple.0 {
        0 => println!("zero"),
        n @ 1..=9 if n % 2 == 0 => println!("small even"),
        _ => println!("other"),
    }

    if let Some(value) = lookup(1) {
        println!("{value}");
    }

    let Some(item) = names.first() else {
        return;
    };

    unsafe {
        COUNTER += 1;
    }

    let result: Result<i32, String> = Ok(1);
    let _ = result.unwrap_or_default();
    let cast = counter as f64;
    let reference = &mut counter;
    *reference += 1;
}

fn lookup(key: i32) -> Option<&'static str> {
    match key {
        1 => Some("one"),
        _ => None,
    }
}

fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() { a } else { b }
}

async fn fetch(url: &str) -> Result<String, Box<dyn std::error::Error>> {
    let body = reqwest::get(url).await?.text().await?;
    Ok(body)
}

pub fn generic<T: Display + Clone, U>(value: T, other: U) -> T
where
    U: Into<String>,
{
    value.clone()
}

#[derive(Debug, Clone, PartialEq)]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

pub struct Circle {
    center: Point,
    radius: f64,
}

pub struct Wrapper<T>(T);

#[derive(Debug)]
pub enum Shape {
    Circle(Circle),
    Rect { width: f64, height: f64 },
    Empty,
}

pub trait Area {
    const SIDES: u32;
    type Output;

    fn area(&self) -> f64;

    fn describe(&self) -> String {
        format!("area {}", self.area())
    }
}

impl Circle {
    pub fn new(radius: f64) -> Self {
        Self { center: Point { x: 0.0, y: 0.0 }, radius }
    }
}

impl Area for Circle {
    const SIDES: u32 = 0;
    type Output = f64;

    fn area(&self) -> f64 {
        PI * self.radius.powi(2)
    }
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

macro_rules! square {
    ($x:expr) => {
        $x * $x
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(square!(2), 4);
    }
}
