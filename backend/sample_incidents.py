"""
Sample operational memory dataset containing historical incident post-mortems for MemoryOps AI.
"""

HISTORICAL_INCIDENTS = [
    {
        "id": "INC-017",
        "title": "PostgreSQL Connection Pool Exhaustion under Peak API Traffic",
        "date": "2026-03-14",
        "severity": "CRITICAL",
        "team": "Core Infrastructure",
        "services_affected": ["core-api", "checkout-service", "pgbouncer"],
        "symptoms": "API latency increased by 400%, HTTP 504 Gateway Timeouts on /api/v1/orders, DB connection pool saturated at 100/100 active connections.",
        "root_cause": "Max connections in PgBouncer connection pooler were capped at 100 while web service autoscaled from 10 to 50 pods during flash sale, causing pool queue backlog and thread starvation.",
        "resolution": "Increased PgBouncer pool limit from 100 to 500, tuned idle connection reaper timeout to 30s, and applied rolling restart to core-api.",
        "recovery_time_minutes": 42,
        "tags": ["postgresql", "connection-pool", "latency", "timeout", "scaling"],
        "preventive_checks": [
            "Verify database connection pool size dynamically matches maximum pod replica bounds",
            "Set client statement timeout to 5000ms to prevent hanging queries",
            "Enable connection pool saturation alerts at 85% threshold"
        ]
    },
    {
        "id": "INC-027",
        "title": "Redis Cache Invalidation Storm during Catalog Deployment",
        "date": "2026-04-02",
        "severity": "HIGH",
        "team": "Platform Engineering",
        "services_affected": ["catalog-service", "redis-cluster", "inventory-db"],
        "symptoms": "Sudden DB CPU spike to 100%, page rendering response time degraded from 50ms to 4500ms, cache miss rate hit 98%.",
        "root_cause": "Deployment script flushes all Redis keys globally upon catalog schema migration instead of scoped key pattern invalidation, causing thundering herd problem on primary DB.",
        "resolution": "Reverted global flush command, implemented targeted key prefix purging with soft TTL fallback, and deployed cache warming worker.",
        "recovery_time_minutes": 28,
        "tags": ["redis", "cache-invalidation", "thundering-herd", "deployment"],
        "preventive_checks": [
            "Prohibit FLUSHALL / FLUSHDB in production deployment scripts",
            "Implement probabilistic cache warming prior to key expiration",
            "Use mutex locks on cache fetch misses to single-thread backend DB queries"
        ]
    },
    {
        "id": "INC-045",
        "title": "Kafka Consumer Lag & Memory Leak in Event Processor",
        "date": "2026-05-19",
        "severity": "CRITICAL",
        "team": "Data Pipeline SRE",
        "services_affected": ["event-stream", "kafka-cluster", "analytics-ingest"],
        "symptoms": "Kafka consumer lag exceeded 1.5M messages, Kubernetes pods triggering OOMKilled crashes repeatedly every 15 minutes.",
        "root_cause": "Unbounded memory buffer in Go consumer loop accumulated unprocessed payload objects during schema validation errors without releasing memory.",
        "resolution": "Added buffer size limit (5000 events max), added dead-letter queue (DLQ) routing for invalid payloads, bumped pod memory limit from 2Gi to 4Gi.",
        "recovery_time_minutes": 65,
        "tags": ["kafka", "memory-leak", "oom-killed", "consumer-lag", "dlq"],
        "preventive_checks": [
            "Verify consumer buffer bounds and memory profile under artificial error injection",
            "Ensure Dead Letter Queue (DLQ) is enabled for deserialization errors",
            "Configure Kafka consumer lag alerts at >10,000 pending messages"
        ]
    },
    {
        "id": "INC-012",
        "title": "DNS Resolution Timeout Across Kubernetes Nodes",
        "date": "2026-02-10",
        "severity": "HIGH",
        "team": "Cloud Infrastructure",
        "services_affected": ["coredns", "kube-proxy", "all-microservices"],
        "symptoms": "Intermittent lookup failures for internal endpoints, services reporting 502 Bad Gateway randomly across 3 worker nodes.",
        "root_cause": "CoreDNS pods underprovisioned for UDP packet burst, combined with single-threaded conntrack table exhaustion on Linux kernel.",
        "resolution": "Deployed NodeLocal DNSCache daemonset, increased CoreDNS replicas from 2 to 6 with autoscaling, tuned net.netfilter.nf_conntrack_max.",
        "recovery_time_minutes": 35,
        "tags": ["dns", "kubernetes", "coredns", "conntrack", "networking"],
        "preventive_checks": [
            "Ensure NodeLocal DNSCache is running on all worker nodes",
            "Monitor CoreDNS CPU/Memory metrics and set HPA scaling threshold at 60% CPU"
        ]
    },
    {
        "id": "INC-033",
        "title": "Elasticsearch Disk Saturation & Write Lock Deadlock",
        "date": "2026-04-22",
        "severity": "MEDIUM",
        "team": "Observability",
        "services_affected": ["elasticsearch", "kibana", "log-collector"],
        "symptoms": "Log ingestion stalled, Elasticsearch cluster status turned RED, disk watermarks exceeded 95%.",
        "root_cause": "Log retention ILM policy failed to execute due to read-only block triggered when disk space passed 95% flood-stage threshold.",
        "resolution": "Expanded persistent storage volume size by 500GB, manually unblocked indices read_only_allow_delete setting, forced snapshot retention run.",
        "recovery_time_minutes": 50,
        "tags": ["elasticsearch", "disk-full", "logging", "ilm-policy"],
        "preventive_checks": [
            "Set disk alert notification at 80% threshold prior to flood-stage lock",
            "Configure automatic index rollover based on age (7d) and size (50GB)"
        ]
    },
    {
        "id": "INC-008",
        "title": "gRPC Keepalive Misconfiguration Causing Load Balancer Drops",
        "date": "2026-01-18",
        "severity": "MEDIUM",
        "team": "Core Platform",
        "services_affected": ["grpc-gateway", "user-service", "alb"],
        "symptoms": "gRPC connections reset with code UNAVAILABLE every 60 seconds, causing brief HTTP 503 spikes in user frontend.",
        "root_cause": "AWS ALB idle timeout was configured to 60s while gRPC client keepalive ping duration was set to 120s, resulting in silent TCP socket closure by LB.",
        "resolution": "Updated gRPC keepalive time to 30s with keepalive_timeout of 10s and permits_without_stream enabled.",
        "recovery_time_minutes": 22,
        "tags": ["grpc", "load-balancer", "keepalive", "tcp-timeout"],
        "preventive_checks": [
            "Ensure gRPC client keepalive interval is less than cloud load balancer idle timeout",
            "Enable HTTP/2 ping frame monitoring on ALB"
        ]
    },
    {
        "id": "INC-052",
        "title": "Stripe Webhook Processing Duplicate Execution & Race Condition",
        "date": "2026-06-03",
        "severity": "HIGH",
        "team": "Payments",
        "services_affected": ["billing-service", "stripe-webhook-handler"],
        "symptoms": "Customers charged twice for subscription renewals during Stripe webhook retries.",
        "root_cause": "Database transaction lock missed idempotency key check on incoming event payloads, allowing concurrent worker threads to process duplicate webhooks simultaneously.",
        "resolution": "Implemented Redis-based distributed lock per event_id with 30s TTL and unique database constraint on payment_event_id.",
        "recovery_time_minutes": 85,
        "tags": ["stripe", "idempotency", "race-condition", "payments", "redis-lock"],
        "preventive_checks": [
            "Verify all external webhook endpoints check idempotency key in a transaction before processing",
            "Use Redis distributed lock for incoming event processing"
        ]
    },
    {
        "id": "INC-061",
        "title": "S3 Upload Throttling during Large Export Batch Job",
        "date": "2026-06-25",
        "severity": "LOW",
        "team": "Analytics",
        "services_affected": ["export-worker", "aws-s3"],
        "symptoms": "Batch export jobs failing with SlowDown HTTP 503 errors from AWS S3 API.",
        "root_cause": "Over 8,000 files uploaded per second under identical object prefix `exports/2026-06-25/`, exceeding S3 single partition request limits.",
        "resolution": "Introduced MD5 hash prefixing to S3 keys (`exports/a4f1/2026-06-25/`) to distribute load across S3 partitions.",
        "recovery_time_minutes": 18,
        "tags": ["aws-s3", "throttling", "batch-job", "partitioning"],
        "preventive_checks": [
            "Enforce hash-prefixed key naming for high-throughput S3 bucket uploads",
            "Implement exponential backoff retry in AWS SDK client config"
        ]
    }
]

RECURRING_PATTERNS = [
    {
        "id": "PAT-001",
        "pattern_name": "Database Connection Pool Exhaustion",
        "occurrences": 6,
        "total_downtime_minutes": 246,
        "avg_recovery_time_minutes": 41,
        "severity": "CRITICAL",
        "primary_cause": "Discrepancy between web server pod autoscaling bounds and fixed database connection pooler max_connections limits.",
        "affected_systems": ["core-api", "checkout-service", "pgbouncer", "auth-service"],
        "resolution_playbook": [
            "Increase max pool size on connection pooler (e.g., PgBouncer/HikariCP)",
            "Set application statement timeout limit (e.g., statement_timeout = 5000ms)",
            "Restart web service pods in batches to release lingering locks"
        ]
    },
    {
        "id": "PAT-002",
        "pattern_name": "Cache Invalidation & Thundering Herd",
        "occurrences": 4,
        "total_downtime_minutes": 124,
        "avg_recovery_time_minutes": 31,
        "severity": "HIGH",
        "primary_cause": "Global cache flush commands during CD deployment scripts causing immediate DB overload.",
        "affected_systems": ["redis-cluster", "catalog-service", "inventory-db"],
        "resolution_playbook": [
            "Switch from global cache flush to granular key prefix deletion",
            "Implement probabilistic cache pre-warming prior to deployment",
            "Enforce mutex locking on cache misses"
        ]
    },
    {
        "id": "PAT-003",
        "pattern_name": "Unbounded Memory Buffers & OOM Crashes",
        "occurrences": 3,
        "total_downtime_minutes": 165,
        "avg_recovery_time_minutes": 55,
        "severity": "HIGH",
        "primary_cause": "Queue consumers lacking max queue capacity bounds when downstream services slow down.",
        "affected_systems": ["kafka-consumer", "event-processor", "analytics-ingest"],
        "resolution_playbook": [
            "Enforce strict maximum element bounds on memory channels/queues",
            "Enable Dead-Letter Queue (DLQ) fallback routing",
            "Configure K8s pod memory request/limit ratio closer to 1.0"
        ]
    },
    {
        "id": "PAT-004",
        "pattern_name": "Missing Idempotency in Payment & Webhook Threads",
        "occurrences": 2,
        "total_downtime_minutes": 140,
        "avg_recovery_time_minutes": 70,
        "severity": "HIGH",
        "primary_cause": "Lack of distributed locking on concurrent external webhook callbacks.",
        "affected_systems": ["billing-service", "stripe-handler", "subscription-engine"],
        "resolution_playbook": [
            "Acquire Redis distributed lock on event key prior to DB transaction",
            "Enforce unique DB index on provider event payload IDs"
        ]
    }
]
