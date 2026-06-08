# User Stories — Integrations

## Epic: Integration hub

**As a** workspace administrator  
**I want** a dedicated Integrations page under Settings  
**So that** I can manage all third-party connections in one place  

---

### US-INT-001 Browse catalog

**As a** QA Lead  
**I want** to see all supported integrations with descriptions and status  
**So that** I can decide what to connect  

**Priority:** P0

---

### US-INT-002 Search and filter

**As a** QA Lead  
**I want** to search integrations and filter by connected / not connected  
**So that** I can quickly find a specific connector  

**Priority:** P1

---

### US-INT-003 View summary metrics

**As a** QA Lead  
**I want** summary cards for connected, active, failed, and last sync  
**So that** I understand portfolio integration health at a glance  

**Priority:** P0

---

### US-INT-004 Connect via OAuth

**As a** Admin  
**I want** to connect Jira (and other OAuth providers) via OAuth 2.0  
**So that** credentials are secure and revocable  

**Priority:** P0

---

### US-INT-005 Connect via API token

**As a** Admin  
**I want** to connect with an API token and test the connection  
**So that** I can use providers without OAuth  

**Priority:** P0

---

### US-INT-006 Configure Jira mapping

**As a** QA Lead  
**I want** to select Jira projects and map priority/status to QAlytics  
**So that** synced defects match our taxonomy  

**Priority:** P0

---

### US-INT-007 Sync on demand

**As a** QA Lead  
**I want** to trigger “Sync now” on a connected integration  
**So that** data is fresh before a release review  

**Priority:** P1

---

### US-INT-008 Disconnect integration

**As a** Admin  
**I want** to disconnect an integration and revoke tokens  
**So that** offboarded tools no longer access our workspace  

**Priority:** P0

---

### US-INT-009 View error logs

**As a** Admin  
**I want** to see integration activity and error logs  
**So that** I can troubleshoot failed syncs  

**Priority:** P1

---

### US-INT-010 GitHub repository selection

**As a** Engineering Manager  
**I want** to select which GitHub repos to sync  
**So that** only relevant codebases appear in QAlytics  

**Priority:** P1

---

### US-INT-011 Confluence documentation import

**As a** QA Analyst  
**I want** to import Confluence spaces  
**So that** requirements link to test cases  

**Priority:** P2

---

### US-INT-012 Custom API connector

**As a** Platform Engineer  
**I want** a custom REST integration with token auth  
**So that** internal tools can feed QAlytics  

**Priority:** P2
