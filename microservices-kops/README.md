# Microservices with API Gateway on Kubernetes (kops)

## Structure
```
microservices-kops/
├── api-gateway/        ← Node.js API Gateway (public entry point)
├── service1–6/         ← Your 6 microservices (internal only)
├── k8s/                ← Kubernetes YAML files
│   ├── api-gateway.yaml   (LoadBalancer - public)
│   └── service1–6.yaml    (ClusterIP - internal)
└── jenkins/
    ├── kops-setup.sh   ← Run once to create K8s cluster
    └── deploy-all.sh   ← Deploy all services to K8s
```

## Steps

### 1. Replace placeholders
- `your-dockerhub` → your Docker Hub username
- `<your-ec2-ip>` → your EC2 instance IP
- `your-kops-state-store` → your S3 bucket name

### 2. Create K8s Cluster (once)
```bash
./jenkins/kops-setup.sh
```

### 3. Build & Push All Images
Each service has its own Jenkinsfile.
Set up a Jenkins job per repo pointing to its Jenkinsfile.

### 4. Deploy All to K8s
```bash
./jenkins/deploy-all.sh
```

### 5. Get Public URL
```bash
kubectl get svc api-gateway
# Copy EXTERNAL-IP → use in your frontend as REACT_APP_API_URL
```

## API Gateway Routes
| Path        | Service         |
|-------------|-----------------|
| /service1/* | service1 :3001  |
| /service2/* | service2 :3002  |
| /service3/* | service3 :3003  |
| /service4/* | service4 :3004  |
| /service5/* | service5 :3005  |
| /service6/* | service6 :3006  |

## Jenkins Credentials Needed
- `dockerhub-creds` → Docker Hub username + password
- `ec2-ssh-key`     → Your EC2 .pem private key (SSH)
