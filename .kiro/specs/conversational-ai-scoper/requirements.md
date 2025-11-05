# Requirements Document

## Introduction

The Conversational AI Scoper System is a sophisticated business consultation tool that transforms vague business ideas and challenges into structured, actionable project outlines. The system uses a 3-layer analysis methodology (Goals → Signals → SMART Metrics) combined with a 3x3 business matrix framework to systematically guide SME owners (1-50 team size) through strategic planning and problem-solving processes.

## Glossary

- **Scoper System**: The complete conversational AI application including frontend chat interface and backend AI processing
- **3-Layer Analysis**: Sequential methodology consisting of Goal Identification (Layer 1), Signal Collection (Layer 2), and SMART Metrics Discussion (Layer 3)
- **Business Matrix**: 3x3 framework mapping business relationships (Owner↔Company, Owner↔Employee, Employee↔Company) against domains (Actors & Interfaces, Information & Artifacts, Processes & Controls)
- **Project Cards**: Structured output documents containing actionable project recommendations with specific approaches (SOP-first, Role-first, Tech-first, Quick-win)
- **Chat Interface**: React-based frontend application providing the user interaction layer
- **AI Backend**: Cloudflare Worker-based service integrating with Anthropic Claude API
- **SME Owner**: Small to Medium Enterprise business owner or founder with 1-50 team members

## Requirements

### Requirement 1

**User Story:** As an SME owner, I want to input my business challenge or idea in natural language, so that I can receive structured analysis and actionable project recommendations.

#### Acceptance Criteria

1. WHEN a user submits a business challenge or idea through the chat interface, THE Scoper System SHALL process the input and initiate Layer 1 goal identification analysis
2. THE Scoper System SHALL classify the input as either problem-solving or idea-execution goal type within the initial response
3. THE Scoper System SHALL map the business situation to the appropriate position in the 3x3 business matrix
4. THE Scoper System SHALL respond with clarifying questions to gather missing strategic information
5. THE Scoper System SHALL maintain conversation context throughout the multi-turn interaction

### Requirement 2

**User Story:** As an SME owner, I want the system to guide me through a structured 3-layer analysis process, so that I can systematically clarify my goals, understand current signals, and define measurable success criteria.

#### Acceptance Criteria

1. THE Scoper System SHALL progress sequentially through Layer 1 (Goals), Layer 2 (Signals), and Layer 3 (SMART Metrics) without skipping layers
2. WHEN Layer 1 analysis is insufficient, THE Scoper System SHALL ask targeted questions to clarify goal type, urgency, and business matrix position
3. WHEN Layer 2 analysis begins, THE Scoper System SHALL collect operational efficiency, strategic positioning, and organizational capability signals
4. WHEN Layer 3 analysis begins, THE Scoper System SHALL propose three potential SMART metrics options with clear rationale
5. THE Scoper System SHALL complete the analysis process within a maximum of 3 refinement rounds per layer

### Requirement 3

**User Story:** As an SME owner, I want to receive 4 different project card recommendations with clear approaches and trade-offs, so that I can choose the most suitable implementation path for my situation.

#### Acceptance Criteria

1. WHEN the 3-layer analysis is complete, THE Scoper System SHALL generate exactly 4 project cards using different approaches (SOP-first, Role-first, Tech-first, Quick-win)
2. THE Scoper System SHALL format each project card with goal statement, approach rationale, team responsibilities, success metrics, effort estimation, and risk assumptions
3. THE Scoper System SHALL rank project cards by impact-to-effort ratio to help prioritization
4. THE Scoper System SHALL ensure each project card addresses the specific business matrix position identified in Layer 1
5. THE Scoper System SHALL validate that recommended projects are achievable within stated resource constraints

### Requirement 4

**User Story:** As an SME owner, I want to interact with the system through an intuitive chat interface, so that I can have natural conversations without learning complex tools or frameworks.

#### Acceptance Criteria

1. THE Chat Interface SHALL display conversation history with user messages right-aligned and AI messages left-aligned
2. THE Chat Interface SHALL provide a text input field with send button for message submission
3. WHEN processing a request, THE Chat Interface SHALL display loading indicators with animated visual feedback
4. THE Chat Interface SHALL maintain responsive design across desktop and mobile devices
5. THE Chat Interface SHALL preserve conversation history throughout the session

### Requirement 5

**User Story:** As a system administrator, I want the backend to securely integrate with Anthropic Claude API, so that the system can provide intelligent responses while protecting sensitive data.

#### Acceptance Criteria

1. THE AI Backend SHALL authenticate with Anthropic Claude API using securely stored environment variables
2. THE AI Backend SHALL use the claude-sonnet-4-5-20250929 model for response generation
3. THE AI Backend SHALL implement CORS headers to enable frontend access from authorized domains
4. THE AI Backend SHALL handle API rate limiting and error responses gracefully
5. THE AI Backend SHALL process conversation context and return structured JSON responses

### Requirement 6

**User Story:** As a business owner, I want the system to be accessible via web browser without installation requirements, so that I can use it immediately from any device.

#### Acceptance Criteria

1. THE Scoper System SHALL be deployable to GitHub Pages for public web access
2. THE Chat Interface SHALL load and function in modern web browsers without plugin requirements
3. THE AI Backend SHALL be hosted on Cloudflare Workers for global edge performance
4. THE Scoper System SHALL support custom domain configuration for professional branding
5. THE Scoper System SHALL maintain sub-3-second response times for typical interactions