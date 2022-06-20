// This wrapper will contain some globally injected scripts handing some link modulepreload'ing logic
// By dynamically importing the script file, we'll force vite to create new file without all this modulepreload logic
// We can forget about the compiled wrapper output and use script.user.js directly
// It will only contain the logic we're actually using
import("./script.user");

export {};
