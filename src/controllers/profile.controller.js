import Profile from "../models/profile.model.js";

/**
 * GET /api/profile
 */
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/profile
 * Create profile (only once)
 */
export const createProfile = async (req, res) => {
  try {
    const exists = await Profile.findOne();
    if (exists) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /api/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * GET /api/projects
 */
export const getProjects = async (req, res) => {
  try {
    const profile = await Profile.findOne().select("projects");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile.projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/search?q=
 */
/**
 * GET /api/search?q=
 * Returns matching projects only
 */
export const searchProfile = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Query parameter q is required" });
    }

    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const query = q.toLowerCase();

    const matchedProjects = profile.projects.filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );

    res.json(matchedProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/projects?skill=
 */
export const getProjectsBySkill = async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({ message: "skill query param is required" });
    }

    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const filteredProjects = profile.projects.filter(project =>
      project.description?.toLowerCase().includes(skill.toLowerCase()) ||
      project.title?.toLowerCase().includes(skill.toLowerCase())
    );

    res.json(filteredProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * GET /api/skills/top
 */
export const getTopSkills = async (req, res) => {
  try {
    const profile = await Profile.findOne().select("skills");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const skillCounts = profile.skills.reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {});

    const topSkills = Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);

    res.json(topSkills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /api/profile
 */
export const deleteProfile = async (req, res) => {
  try {
    const result = await Profile.deleteMany({});
    res.json({ message: "Profile deleted", deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

