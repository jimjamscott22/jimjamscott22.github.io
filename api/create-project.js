// api/create-project.js
// Serverless function to create new project files in GitHub

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin token
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    const adminToken = process.env.ADMIN_TOKEN;

    if (!adminToken) {
      console.error('ADMIN_TOKEN not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse request body
    const { slug, content } = req.body;

    if (!slug || !content) {
      return res.status(400).json({ error: 'Missing slug or content' });
    }

    // Validate slug format (only lowercase letters, numbers, hyphens)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({ error: 'Invalid slug format' });
    }

    // GitHub API details
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; // e.g., "jimjamscott22/jimjamscott22.github.io"

    if (!githubToken || !githubRepo) {
      console.error('GitHub credentials not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const [owner, repo] = githubRepo.split('/');
    const filePath = `_projects/${slug}.md`;

    // Check if file already exists
    const checkUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const checkResponse = await fetch(checkUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (checkResponse.ok) {
      return res.status(409).json({ error: `Project with slug "${slug}" already exists` });
    }

    // Create the file
    const createUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const createBody = {
      message: `Add new project: ${slug}`,
      content: Buffer.from(content).toString('base64'),
      branch: 'main', // Change if you use a different default branch
    };

    const createResponse = await fetch(createUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createBody),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}));
      console.error('GitHub API error:', errorData);
      return res.status(createResponse.status).json({
        error: errorData.message || 'Failed to create project file in GitHub',
      });
    }

    const result = await createResponse.json();

    return res.status(201).json({
      success: true,
      message: `Project "${slug}" created successfully`,
      file: result.content.path,
      commit: result.commit.sha,
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
}
