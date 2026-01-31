using System;
using UnityEngine;

public class Payloads : MonoBehaviour
{

}

[Serializable]
public class SceneTransitionPayload
{
    public string fromScene;
    public string toScene;
    public bool newGame;
}

[Serializable]
public class PlayerDeathPayload
{
    public string causeOfDeath;
    public string sceneName;
    public Vector2 deathPosition;
}

[Serializable]
public class PlayerDamagedPayload
{
    public string source;
    public string sceneName;
    public Vector2 damagePosition;
}

[Serializable]
public class EnemyDefeatedPayload
{
    public string enemyType;
    public string weaponUsed;
    public string sceneName;
    public Vector2 defeatPosition;
}

public class ItemCollectedPayload
{
    public string itemType;
    public string sceneName;
    public Vector2 collectPosition;
}

public class MoneyCollectedPayload
{
    public int amount;
    public int totalMoney;
    public string sceneName;
    public Vector2 collectPosition;
}

public class ItemPurchasedPayload
{
    public string itemType;
    public int cost;
    public int totalMoney;
}

[Serializable]
public class SessionStartPayload
{
    public string buildVersion = "unknown";
    public string platform = "unknown";
}

[Serializable]
public class SessionEndPayload
{
    public string cause;
}

[Serializable]
public class RunEndPayload
{
    public string reason;
    public float runDuration;
}
