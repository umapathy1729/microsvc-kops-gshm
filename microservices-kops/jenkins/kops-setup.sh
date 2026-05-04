#!/bin/bash
# ─────────────────────────────────────────────
# Run this ONCE on your local machine to create
# the Kubernetes cluster using kops on AWS
# ─────────────────────────────────────────────

# REPLACE THESE:
export KOPS_STATE_STORE=s3://your-kops-state-store
export NAME=mycluster.k8s.local
export AWS_REGION=us-east-1

echo "Step 1: Creating S3 bucket for kops state..."
aws s3 mb $KOPS_STATE_STORE --region $AWS_REGION

echo "Step 2: Creating cluster config..."
kops create cluster \
  --name=${NAME} \
  --state=${KOPS_STATE_STORE} \
  --zones=${AWS_REGION}a \
  --node-count=2 \
  --node-size=t3.medium \
  --master-size=t3.medium \
  --yes

echo "Step 3: Waiting for cluster to be ready (this takes ~10 mins)..."
kops validate cluster --wait 10m

echo "✅ Cluster ready! Run deploy-all.sh to deploy services."
