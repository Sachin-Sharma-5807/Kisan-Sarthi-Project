// vendor login API
const loginVendor = async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ where: { email } });

  if (!vendor) return res.status(404).json({ msg: "Vendor not found" });

  const isMatch = await bcrypt.compare(password, vendor.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: vendor.id, role: "vendor" }, 
    process.env.JWT_SECRET, 
    { expiresIn: "1d" }
  );

  res.json({
    token,
    vendorId: vendor.id, // Yeh front-end me kaam aayega
    vendorName: vendor.name,
    showroomName: vendor.showroomName
  });
};
