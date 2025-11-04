# Contributing to FinGuide

Thank you for your interest in contributing to FinGuide! 🎉

## How to Contribute

### Reporting Bugs
- Check if the bug has already been reported in Issues
- Use the bug report template
- Include steps to reproduce, expected behavior, and screenshots

### Suggesting Features
- Check if the feature has already been suggested
- Explain the use case and benefits
- Provide examples if possible

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   # Backend tests
   cd backend
   python -m pytest

   # Frontend tests
   cd frontend
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for review

## Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Code Style

### Python
- Follow PEP 8
- Use type hints where appropriate
- Write docstrings for functions

### JavaScript/React
- Use ES6+ features
- Follow React best practices
- Use functional components with hooks

## Testing

### Backend
```bash
cd backend
python -m pytest tests/
```

### Frontend
```bash
cd frontend
npm test
```

## Documentation

- Update README.md for user-facing changes
- Update TECHNICAL_DETAILS.md for architecture changes
- Add comments for complex algorithms

## Questions?

Feel free to open an issue for any questions or discussions!

---

Thank you for contributing! 🚀
