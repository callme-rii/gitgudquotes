# Git Gud Quotes

A collaborative quote board designed for software engineering students to practice Git and GitHub workflows. 

This project simulates an open-source collaboration environment. By submitting a pull request, your quote will be instantly featured on the live static site in our Git Gud Quotes gallery! Built purely with HTML, CSS, and plain JavaScript.

## 🎯 Learning Objectives

- Understand the standard open-source Fork & Pull Request workflow.
- Practice branching, committing, and pushing code.
- Gain experience modifying structured data (JSON).
- Learn how to resolve merge conflicts (if multiple students edit the file at the same time).
- Understand Git and GitHub collaboration best practices.

## 🛠️ How to Participate

There are two ways you can get your quote on the board:

### Option A: The Pro Way (GitHub Pull Request)
This is for those who want to practice the real-world software engineering workflow. Contributions made this way are **permanent** and will be visible to everyone!

1. **Fork** this repository.
2. **Clone** your fork and create a branch.
3. **Add your quote** to `quotes.json`.
4. **Commit, Push, and PR!** (Full guide below).

### Option B: The Quick Way (Instant Form)
Perfect if you're having technical issues or just want to see how your quote looks instantly.
1. Click the **"Add My Quote Instantly"** button on the website.
2. Fill out the form.
3. Your quote will appear immediately on your browser! (Note: This is saved locally to your browser via `localStorage`).

---

## 🎯 Step-by-Step Guide for Option A (PR)

When editing `quotes.json`, ensure your entry matches the exact format of the existing objects. 
- Ensure proper use of double quotes (`"`), commas `,`, and curly braces `{}`. 
- The array must be valid JSON format!

### Example Quote Entry

```json
  {
    "name": "Jane Doe",
    "class": "SE-101",
    "quote": "git push --force is not your friend."
  }
```
*(Make sure to add a comma `,` after the previous entry's closing brace `}` before adding yours!)*

---

## 🚦 Contribution Rules

To keep the repository clean and collaborative, please adhere to these rules:
- **Do NOT edit other students' quotes.** Only add your own.
- **Use a meaningful branch name** (e.g., `add-quote-johndoe`).
- **Use clear commit messages in the imperative mood** (e.g., `Add quote from John Doe` rather than `added my quote`).
- **Validate your JSON before submitting!** Missing commas or broken brackets will break the application. You can use tools like [JSONLint](https://jsonlint.com/) or built-in IDE features to check.

---

## 📚 Optional README Collaboration Task

Want to do a little extra? Add a helpful Git tip or common error solution below! (Propose this in a separate Pull Request or along with your quote).

### Git Tips & Tricks
- *Add your favorite tip here!*

### Common Git Errors and Solutions
- *Add a common error and its solution here!*
