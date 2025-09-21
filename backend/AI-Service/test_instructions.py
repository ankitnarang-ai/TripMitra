#!/usr/bin/env python3
"""
Test script to demonstrate both instruction sets
"""

import asyncio
import os
import json
from main import app
from models.payload import UserQueryPayload

# Set environment variables for testing
os.environ["MONGODB_URL"] = "mongodb+srv://harshdixit779:Hash%2312%40atlas@demo.8kbhy.mongodb.net/"
os.environ["DB_NAME"] = "tripmitra"
os.environ["COLLECTION_NAME"] = "preferences"

async def test_instruction_sets():
    """Test both instruction sets"""
    print("🧪 Testing Agent Instruction Sets")
    print("=" * 50)
    
    test_payload = UserQueryPayload(
        user_query="Plan a 2-day trip to Mumbai",
        user_id="test_instruction",
        user_meta={"location": "Delhi"}
    )
    
    # Test Instruction Set 1 (JSON Output)
    print("\n📋 Testing Instruction Set 1 (JSON Output):")
    print("-" * 40)
    os.environ["AGENT_INSTRUCTION_SET"] = "1"
    
    try:
        from services.agent.response import get_response
        response1 = await get_response(test_payload)
        print("✅ Response received")
        
        # Try to parse as JSON
        try:
            # Remove markdown code blocks if present
            clean_response = response1.replace("```json\n", "").replace("```", "").strip()
            parsed_json = json.loads(clean_response)
            print("✅ Valid JSON structure")
            print(f"   Itineraries count: {len(parsed_json.get('itineraries', []))}")
            print(f"   Success: {parsed_json.get('success', False)}")
        except json.JSONDecodeError as e:
            print(f"❌ JSON parsing failed: {e}")
            print(f"   Response preview: {response1[:200]}...")
            
    except Exception as e:
        print(f"❌ Instruction Set 1 failed: {e}")
    
    # Test Instruction Set 2 (Conversational)
    print("\n💬 Testing Instruction Set 2 (Conversational):")
    print("-" * 40)
    os.environ["AGENT_INSTRUCTION_SET"] = "2"
    
    try:
        from services.agent.response import get_response
        response2 = await get_response(test_payload)
        print("✅ Response received")
        print(f"   Response preview: {response2[:200]}...")
        
        # Check if it's asking questions (conversational)
        if any(word in response2.lower() for word in ["could you", "please", "clarify", "specify", "?"]):
            print("✅ Conversational response detected")
        else:
            print("⚠️  Response doesn't seem conversational")
            
    except Exception as e:
        print(f"❌ Instruction Set 2 failed: {e}")
    
    print("\n🎉 Instruction set testing completed!")

if __name__ == "__main__":
    asyncio.run(test_instruction_sets())
