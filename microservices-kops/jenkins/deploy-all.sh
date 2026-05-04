#!/bin/bash
# ─────────────────────────────────────────────
# Run on EC2 (via Jenkins SSH) to deploy all
# services to the Kubernetes cluster
# ─────────────────────────────────────────────

echo "Deploying all microservices..."

kubectl apply -f k8s/service1.yaml
kubectl apply -f k8s/service2.yaml
kubectl apply -f k8s/service3.yaml
kubectl apply -f k8s/service4.yaml
kubectl apply -f k8s/service5.yaml
kubectl apply -f k8s/service6.yaml
kubectl apply -f k8s/api-gateway.yaml

echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod --all --timeout=120s

echo ""
echo "✅ All services deployed!"
echo ""
kubectl get pods
echo ""
echo "Your public API Gateway URL:"
kubectl get svc api-gateway
