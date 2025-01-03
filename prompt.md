# Trading Goal Visualization Website

## The Idea

Build a website that helps traders visualize their trading goal.  
For example, if the user’s **starting capital** is \$1,000 and the **goal** is \$1,000,000, the website will:

- Divide the goal into manageable steps, where each step **doubles** the capital.  
  - **Step 1**: \$1,000 → \$2,000  
  - **Step 2**: \$2,000 → \$4,000  
  - **Step 3**: \$4,000 → \$8,000  
  - **Step 4**: \$8,000 → \$16,000  
  - …until the final goal (\$1,000,000) is reached.

## Small Steps & Vault Concept

For each step, we create a **vault**. In this vault, the user places **trade results**:

- **Profit/Loss Amount**  
- **Name of the Stock**  
- **Lesson Learned**

Each trade becomes a **bubble**:
- **Green bubble** if profit  
- **Red bubble** if loss  
- **Bubble size** is proportional to the profit/loss **relative to the current step’s goal**.  
  - For example, a \$500 profit in the \$1,000 → \$2,000 vault (where you’re effectively aiming to gain \$1,000) will be visually larger than a \$500 profit in the \$8,000 → \$16,000 vault (where you’re aiming to gain \$8,000).

When a loss occurs, it visually **pops** or offsets an equivalent portion of a green bubble to represent how losses reduce overall capital or profit. Each vault starts at the previous step’s ending capital and ends at the current step’s goal.

---

## Detailed Requirements

### 1. Goal Definition & Step Calculation

1. **User Input**  
   - Starting capital (e.g., \$1,000)  
   - Final goal (e.g., \$1,000,000)

2. **Step Logic**  
   - Automatically divide the goal into steps, each **doubling** the starting point until reaching (or exceeding) the final goal.

3. **Progress Tracking**  
   - Each step is represented by a **vault** that tracks progress from the previous step’s ending capital to the current step’s target.

---

### 2. Vault & Trade Logging

1. **Vault Creation**  
   - For each step, a vault is generated to hold **trade entries** (e.g., \$1,000 → \$2,000 vault).

2. **Trade Entries**  
   - **Profit/Loss Amount** (numeric)  
   - **Stock Name** (text)  
   - **Lesson Learned** (text)

3. **Bubble Representation**  
   - **Color**: Green for profits, Red for losses  
   - **Size**: Proportional to the vault’s capital range. A \$500 gain in a \$1,000 → \$2,000 step vault is larger than a \$500 gain in an \$8,000 → \$16,000 step vault.  
   - **Interaction**: Losses “pop” or reduce part of the profit bubbles to illustrate the offset.

---

### 3. Visualization & UI Behavior

1. **Vault Display**  
   - Shows a container starting at the step’s initial capital and aiming toward the step’s goal.  
   - Accumulated bubbles (profits/losses) fill the vault.  
   - Dynamic or animated representation of how each profit bubble contributes and how each loss bubble detracts from the goal.

2. **Step Completion**  
   - Once the vault amount meets or exceeds the step goal, that step is **complete**.  
   - The next vault activates, starting at the new capital level.

3. **Overall Progress**  
   - A **progress bar** or indicator to show how many steps (vaults) have been completed out of the total needed to reach the final goal.  
   - Optionally, a **summary view** with each vault’s net result and key lessons learned.

---

### 4. User Flow

1. Enter **Start/Goal** capitals.  
2. View **calculated steps**.  
3. Populate each **vault** with trades (bubbles).  
4. Observe **net progress**.  
5. Proceed to the **next vault** once the step goal is reached.

---

## Part 2: Feature Add-On

1. **Bubble Instead of Horizontal Bar**  
   - Replace any static bar charts with **bubble representations** similar to [Crypto Bubbles](https://cryptobubbles.net/).  
   - Different sizes/colors to represent varying values and profits/losses.

2. **Hover Interaction**  
   - On **hover**, display a **formatted card** revealing:  
     - The **stock name**  
     - The **trade amount** (profit or loss)  
     - The **lesson learned**  

---

## Part 3: Improvements & Additional Feature

1. **Two Views of the Vault**  
   - **Gross** (pure profit/loss visualization)  
   - **Net** (profit minus loss)  
   - Both views use the **same bubble concept**, just calculated differently:
     - **Gross View**: Displays total winnings and total losings as separate bubble sets.  
     - **Net View**: Combines or offsets the bubbles so the net effect is shown.

2. **Interactive Bubbles**  
   - When hovering over or moving the mouse between bubbles, they gently **move or bounce**, enhancing the interactive feel.

---

**End of Prompt**  
