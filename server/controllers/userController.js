import User from "../models/User.js";

export const registerOrLoginUser = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  try {
    let user = await User.findOne({ username });
    if (!user) {
      user = await User.create({ username });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserData = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addSlot = async (req, res) => {
  const { username } = req.params;
  const { date, start, end } = req.body;
  if (!date || !start || !end) {
    return res
      .status(400)
      .json({ message: "Date, start and end times are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    let slots = user.availability.get(date) || [];
    // Prevent duplicate slot
    if (!slots.some((slot) => slot.start === start && slot.end === end)) {
      slots.push({ start, end });
    }
    user.availability.set(date, slots);
    await user.save();
    if (req.app.locals.io) {
      req.app.locals.io.emit("availabilityUpdated", {
        username,
        availability: user.availability,
      });
    }
    res
      .status(200)
      .json({ message: "Slot added", availability: user.availability });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSlot = async (req, res) => {
  const { username } = req.params;
  const { date, start, end } = req.body;
  if (!date || !start || !end) {
    return res
      .status(400)
      .json({ message: "Date, start and end times are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    let slots = user.availability.get(date) || [];
    slots = slots.filter((slot) => !(slot.start === start && slot.end === end));
    user.availability.set(date, slots);
    await user.save();
    if (req.app.locals.io) {
      req.app.locals.io.emit("availabilityUpdated", {
        username,
        availability: user.availability,
      });
    }
    res
      .status(200)
      .json({ message: "Slot deleted", availability: user.availability });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSlot = async (req, res) => {
  const { username } = req.params;
  const { date, oldStart, oldEnd, newStart, newEnd } = req.body;
  if (!date || !oldStart || !oldEnd || !newStart || !newEnd) {
    return res
      .status(400)
      .json({
        message: "Date, oldStart, oldEnd, newStart and newEnd are required",
      });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    let slots = user.availability.get(date) || [];
    const index = slots.findIndex(
      (slot) => slot.start === oldStart && slot.end === oldEnd
    );
    if (index === -1) {
      return res.status(404).json({ message: "Slot not found" });
    }
    if (slots.some((slot) => slot.start === newStart && slot.end === newEnd)) {
      return res.status(400).json({ message: "New slot already exists" });
    }
    slots[index] = { start: newStart, end: newEnd };
    user.availability.set(date, slots);
    await user.save();
    if (req.app.locals.io) {
      req.app.locals.io.emit("availabilityUpdated", {
        username,
        availability: user.availability,
      });
    }
    res
      .status(200)
      .json({ message: "Slot updated", availability: user.availability });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const copyAvailability = async (req, res) => {
  const { username } = req.params;
  const { sourceDate, targetDate } = req.body;
  if (!sourceDate || !targetDate) {
    return res
      .status(400)
      .json({ message: "Source and target dates are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const sourceSlots = user.availability.get(sourceDate) || [];
    user.availability.set(targetDate, sourceSlots);
    await user.save();
    if (req.app.locals.io) {
      req.app.locals.io.emit("availabilityUpdated", {
        username,
        availability: user.availability,
      });
    }
    res
      .status(200)
      .json({
        message: "Availability copied",
        availability: user.availability,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTimezone = async (req, res) => {
  const { username } = req.params;
  const { timezone } = req.body;
  if (!timezone)
    return res.status(400).json({ message: "Timezone is required" });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.timezone = timezone;
    await user.save();
    if (req.app.locals.io) {
      req.app.locals.io.emit("timezoneUpdated", { username, timezone });
    }
    res.status(200).json({ message: "Timezone updated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
