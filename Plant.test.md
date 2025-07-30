# Plant Component Manual Test Cases

## Test Objective
Verify that the Plant component correctly changes stages and displays the next stage when the "Grow Plant" button is clicked.

## Test Environment
- Component: `src/components/Plant.tsx`
- Plant Stages: ["🌱", "🌿", "🌳"]
- Initial Stage: 0 (🌱)

## Test Cases

### Test Case 1: Initial State
**Objective**: Verify the plant starts at the correct initial stage

**Steps**:
1. Load the application
2. Navigate to the Plant component
3. Observe the displayed plant emoji

**Expected Result**: 
- Plant should display 🌱 (seedling stage)
- "Grow Plant" button should be enabled
- "Reset Plant" button should be enabled

**Status**: [ ] Pass [ ] Fail

---

### Test Case 2: First Stage Change (🌱 → 🌿)
**Objective**: Verify the plant progresses from seedling to sprout stage

**Steps**:
1. Ensure plant is at initial stage (🌱)
2. Click the "Grow Plant" button
3. Observe the displayed plant emoji

**Expected Result**:
- Plant should change from 🌱 to 🌿
- "Grow Plant" button should remain enabled
- "Reset Plant" button should remain enabled

**Status**: [ ] Pass [ ] Fail

---

### Test Case 3: Second Stage Change (🌿 → 🌳)
**Objective**: Verify the plant progresses from sprout to tree stage

**Steps**:
1. Ensure plant is at sprout stage (🌿)
2. Click the "Grow Plant" button
3. Observe the displayed plant emoji

**Expected Result**:
- Plant should change from 🌿 to 🌳
- "Grow Plant" button should be disabled (no more stages)
- "Reset Plant" button should remain enabled

**Status**: [ ] Pass [ ] Fail

---

### Test Case 4: Maximum Stage Reached
**Objective**: Verify that clicking "Grow Plant" at maximum stage has no effect

**Steps**:
1. Ensure plant is at maximum stage (🌳)
2. Click the "Grow Plant" button multiple times
3. Observe the displayed plant emoji

**Expected Result**:
- Plant should remain at 🌳 stage
- No visual change should occur
- "Grow Plant" button should remain disabled

**Status**: [ ] Pass [ ] Fail

---

### Test Case 5: Reset Functionality
**Objective**: Verify the reset button returns plant to initial stage

**Steps**:
1. Grow plant to any stage (🌿 or 🌳)
2. Click the "Reset Plant" button
3. Observe the displayed plant emoji

**Expected Result**:
- Plant should return to 🌱 stage
- "Grow Plant" button should be enabled again
- "Reset Plant" button should remain enabled

**Status**: [ ] Pass [ ] Fail

---

### Test Case 6: Multiple Growth Cycles
**Objective**: Verify complete growth cycle can be repeated after reset

**Steps**:
1. Grow plant from 🌱 to 🌳
2. Click "Reset Plant" to return to 🌱
3. Grow plant again through all stages
4. Observe each stage transition

**Expected Result**:
- Plant should progress: 🌱 → 🌿 → 🌳
- Each stage should display correctly
- Reset should work at any stage
- Multiple cycles should work consistently

**Status**: [ ] Pass [ ] Fail

---

## Test Execution Instructions

### Prerequisites
- Application is running (`npm run dev`)
- Plant component is accessible in the UI

### How to Run Tests
1. Open the application in a web browser
2. Navigate to the Plant component section
3. Execute each test case in order
4. Mark each test case as Pass or Fail
5. Document any issues or unexpected behavior

### Test Data
- **Plant Stages Array**: `["🌱", "🌿", "🌳"]`
- **Stage Indexes**: 0 (🌱), 1 (🌿), 2 (🌳)
- **Maximum Stage**: 2 (🌳)

### Notes
- All tests should be performed manually
- Take screenshots if needed for documentation
- Report any visual glitches or unexpected behavior
- Verify button states (enabled/disabled) at each stage

## Test Results Summary

| Test Case | Status | Notes |
|-----------|--------|-------|
| Initial State | [ ] Pass [ ] Fail | |
| First Stage Change | [ ] Pass [ ] Fail | |
| Second Stage Change | [ ] Pass [ ] Fail | |
| Maximum Stage Reached | [ ] Pass [ ] Fail | |
| Reset Functionality | [ ] Pass [ ] Fail | |
| Multiple Growth Cycles | [ ] Pass [ ] Fail | |

**Overall Test Result**: [ ] All Tests Pass [ ] Some Tests Fail

**Issues Found**: 
- 

**Recommendations**:
- 